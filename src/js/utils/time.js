import {Timestamp} from "../db/firestrore";
import moment from "moment";

export const createTimeStamp = () => {
  return Timestamp.now().toMillis().toString()
}

export const formatTimeAgo = timeStamp => {
  return moment(+timeStamp).fromNow()
}
