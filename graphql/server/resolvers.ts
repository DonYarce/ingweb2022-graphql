import { UserResolvers } from "./users/resolvers";
import { RestaurantResolvers } from "./restaurants/resolvers";
import { ReservationResolvers } from "./reservations/resolvers";
import { HeadquarterResolvers } from "./headquarters/resolvers";
import { TableResolvers } from "./tables/resolvers";
import { ScheduleResolvers } from "./schedules/resolvers";

const GlobalResolvers = [UserResolvers, RestaurantResolvers, ReservationResolvers, HeadquarterResolvers, TableResolvers, ScheduleResolvers];

export { GlobalResolvers };
