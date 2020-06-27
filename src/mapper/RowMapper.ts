export default interface RowMapper<T> {
  mapRow: (rs: any) => T;
}