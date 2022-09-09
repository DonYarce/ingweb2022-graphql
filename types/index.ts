import { NextApiRequest } from "next/types";

export interface Context {
  //   session: Session;
  req: NextApiRequest;
  auth: any;
}

interface ResolverFunction {
  [key: string]: (parent: any, args: any, context: Context, info: any) => any;
}

export interface Resolver {
  Query: ResolverFunction;
  Mutation: ResolverFunction;
  [key: string]: ResolverFunction;
}
