import { typeDefs } from "./typedef";
import { resolvers } from "./resolvers";
import { mutations } from "./mutations";
import { queries } from "./queries";

export const userSchema = {
    typeDefs,
    resolvers,
    mutations,
    queries
}