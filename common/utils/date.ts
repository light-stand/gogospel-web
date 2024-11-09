import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

import "dayjs/locale/es";

dayjs.extend(localizedFormat);
dayjs.extend(duration);
dayjs.extend(relativeTime);

export default dayjs;
