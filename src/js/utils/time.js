import {Timestamp} from "../db/firestrore";

export const createTimeStamp = () => {
  return Timestamp.now().toMillis().toString()
}
