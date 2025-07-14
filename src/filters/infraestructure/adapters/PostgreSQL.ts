import { Postgresql } from "../../../core/database/postgresql";
import { FilterDTO } from "../../application/dtos/output/Filter_dto";
import { FilterMapper } from "../../application/mappers/Filter_mapper";
import { Filter } from "../../domain/entities/Filter";
import { FilterLayer } from "../../domain/entities/FilterLayer";
import { Sensor } from "../../domain/entities/Sensor";
import { FilterRepository } from "../../domain/repositories/IFilter_repository";

export class PostgreSQL implements FilterRepository {
  private readonly conn = Postgresql.getInstance();

  async createFilter(filter: Filter): Promise<void> {
    const sql = `
      INSERT INTO filters (filter_id, filter_model_id, created_by, is_active, created_at) 
      VALUES ($1, $2, $3, $4, $5)`;

    let filterModelId = await this.findFilterModel(filter.getModel());

    if (!filterModelId) filterModelId = await this.createFilterModel(filter.getModel());

    const params = [
      filter.getId(),
      filterModelId,
      filter.getCreatedBy(),
      filter.getStatus(),
      filter.getInstallationDate(),
    ];
    
    await this.conn.query(sql, params);
    await this.associateSensorsFilter(filter.getId(), filter.getSensors());
    await this.associateLayersFilter(filter.getId(), filter.getFilterLayers());
  }

  private async createFilterModel(filterModel: string): Promise<string> {
    const sql = `
    INSERT INTO filter_models (name_device_model) VALUES ($1)
    RETURNING device_model_id`;

    const result = await this.conn.query(sql, [filterModel]);

    if (result.rowCount == 0) throw new Error("Failed to create type filter layer");

    return result.rows[0].device_model_id;
  }

  private async createLayerType(name: string, lifeTime: number): Promise<string> {
    const sql = `
      INSERT INTO types_filter_layers (layer_type_name, approximate_useful_life) 
      VALUES ($1, $2) 
      RETURNING type_filter_layer_id`;

    const result = await this.conn.query(sql, [name, lifeTime]);

    if (result.rowCount == 0) throw new Error("Failed to create type filter layer");

    return result.rows[0].type_filter_layer_id;
  }

  private async createSensorModel(name: string,model: string,unit: string): Promise<string> {
    const sql = `
      INSERT INTO sensors_models (name_sensor, name_model, unit_measurement)
      VALUES ($1, $2, $3)
      RETURNING sensor_model_id`;

    const result = await this.conn.query(sql, [name, model, unit]);

    if (result.rowCount === 0) throw new Error("Failed to create sensor model");

    return result.rows[0].sensor_model_id;
  }

  private async associateSensorsFilter(filterId: string, sensors: Sensor[]): Promise<void> {
    for (const sensor of sensors) {
      let sensorModelId = await this.findSensorModel(sensor.getName(), sensor.getModel(), sensor.getUnitMeasurement());

      if (!sensorModelId) {
        sensorModelId = await this.createSensorModel(sensor.getName(), sensor.getModel(), sensor.getUnitMeasurement());
      }

      const sql = `
        INSERT INTO sensors (sensor_id, sensor_model_id, filter_id)
        VALUES ($1, $2, $3)`;

      const params = [sensor.getId(), sensorModelId, filterId];

      await this.conn.query(sql, params);
    }
  }

  private async associateLayersFilter(filterId: string, filterLayers: FilterLayer[]): Promise<void> {
    for (const layer of filterLayers) {
      let layerTypeId = await this.findLayerType(layer.getName(), layer.getLifeTime());

      if (!layerTypeId) {
        layerTypeId = await this.createLayerType(layer.getName(),layer.getLifeTime());
      }

      const sql = `
        INSERT INTO filter_layers (filter_layer_id, type_filter_layer_id, filter_id, efficiency)
        VALUES ($1, $2, $3, $4)`;

      const params = [layer.getId(),layerTypeId,filterId,layer.getEfficiency()];

      await this.conn.query(sql, params);
    }
  }

  private async findFilterModel(filterModel: string): Promise<string | null> {
    const sql = `
      SELECT device_model_id 
      FROM filter_models
      WHERE name_device_model = $1`;
    
    const result = await this.conn.query(sql, [filterModel]);

    return result.rows.length > 0 ? result.rows[0].device_model_id : null;
  }

  private async findLayerType(name: string, lifeTime: number): Promise<string | null> {
    const sql = `
      SELECT type_filter_layer_id 
      FROM types_filter_layers 
      WHERE layer_type_name = $1 AND approximate_useful_life = $2`;
    const result = await this.conn.query(sql, [name, lifeTime]);

    return result.rows.length > 0 ? result.rows[0].type_filter_layer_id : null;
  }

  private async findSensorModel(name: string,model: string,unit: string): Promise<string | null> {
    const sql = `
      SELECT sensor_model_id 
      FROM sensors_models
      WHERE name_sensor = $1 AND name_model = $2 AND unit_measurement = $3`;

    const result = await this.conn.query(sql, [name, model, unit]);

    return result.rows.length > 0 ? result.rows[0].sensor_model_id : null;
  }

  private async getAllFilters(): Promise<FilterDTO[]> {
    const sql = `
      SELECT 
        f.filter_id,
        fm.name_device_model,
        f.is_active,
        f.created_at,
        u.first_name,
        u.first_surname,
        u.middle_surname
      FROM filters f
      JOIN users u ON f.user_id = u.user_id
      JOIN filter_models fm ON f.filter_model_id = fm.device_model_id
      ORDER BY f.created_at DESC
    `;

    const result = await this.conn.query(sql);

    if (result.rows.length === 0) return [];

    return FilterMapper.toFilterDTO(result.rows);
    
  }
  
}
