import { BookingLimitsEnum_2024_06_14 } from "@calcom/platform-enums";
import type {
  BookingLimitsKeysInputType,
  TransformBookingLimitsSchema_2024_06_14,
} from "@calcom/platform-types";

export function transformIntervalLimitsInternalToApi(
  transformedBookingFields: TransformBookingLimitsSchema_2024_06_14 | null
) {
  if (!transformedBookingFields) {
    return undefined;
  }
  const res: { [K in BookingLimitsKeysInputType]?: number } = {};
  // Changed from .map() to .forEach() since the return value was not being used
  // This avoids unnecessary array creation and is compatible with React 19.2.1
  transformedBookingFields &&
    Object.entries(transformedBookingFields).forEach(([key, value]) => {
      const outputKey: BookingLimitsKeysInputType | undefined = Object.keys(
        BookingLimitsEnum_2024_06_14
      ).find(
        (item) => BookingLimitsEnum_2024_06_14[item as keyof typeof BookingLimitsEnum_2024_06_14] === key
      ) as BookingLimitsKeysInputType;

      if (outputKey) {
        res[outputKey] = value as number;
      }
    });
  return res;
}
