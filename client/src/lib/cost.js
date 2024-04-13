export function calculateCost(transitOption) {

    switch (transitOption.vehicleType) {
        case "BUS":
            return 25;
        case "RAIL":
            return 10;
        case "METRO_RAIL":
            return 10;

        default:
            return 0;
    }
}
