// import * as gql from "../gql";
// import { Account, Allow, BaseResolver, Id, RequiredAuth } from "@nogql/util-server";
// import { Args, ID, Mutation, Parent, ResolveField, Resolver } from "@nestjs/graphql";
// import { FileService } from "../file/file.service";
// import { KeyringService } from "../keyring/keyring.service";
// import { UseGuards } from "@nestjs/common";
// import { UserService } from "./user.service";
// import { cnst } from "@nogql/util";

// @Resolver(() => gql.User)
// export class UserResolver extends BaseResolver(gql.User, gql.UserInput, Allow.Public, Allow.Public, Allow.Owner) {
//   constructor(
//     private readonly userService: UserService,
//     private readonly keyringService: KeyringService,
//     private readonly fileService: FileService
//   ) {
//     super(userService, keyringService);
//   }

//   @Mutation(() => [gql.File])
//   @UseGuards(Allow.Every)
//   async addUserFiles(
//     @Args({ name: "files", type: () => [gql.FileUpload] })
//     files: gql.FileUpload[],
//     @Args({ name: "userId", type: () => ID, nullable: true }) userId?: string
//   ) {
//     return await this.fileService.addFiles(files, "user", userId);
//   }

//   @Mutation(() => gql.User)
//   @UseGuards(Allow.Every)
//   async addUserRole(
//     @Args({ name: "userId", type: () => ID }) userId: string,
//     @Args({ name: "role", type: () => String }) role: cnst.UserRole
//   ) {
//     return await this.userService.addUserRole(new Id(userId), role);
//   }

//   @Mutation(() => Boolean)
//   @UseGuards(Allow.User)
//   async addMobileToken(@Args({ name: "token", type: () => String }) token: string, @RequiredAuth() account: Account) {
//     return await this.userService.addMobileToken(account._id, token);
//   }

//   @Mutation(() => gql.User)
//   @UseGuards(Allow.Admin)
//   async subUserRole(
//     @Args({ name: "userId", type: () => ID }) userId: string,
//     @Args({ name: "role", type: () => String }) role: cnst.UserRole
//   ) {
//     return await this.userService.subUserRole(new Id(userId), role);
//   }

//   @Mutation(() => gql.User)
//   @UseGuards(Allow.Admin)
//   async restrictUser(
//     @Args({ name: "userId", type: () => ID }) userId: string,
//     @Args({ name: "restrictReason", type: () => String })
//     restrictReason: string,
//     @Args({ name: "restrictUntil", type: () => Date, nullable: true })
//     restrictUntil?: Date
//   ) {
//     return await this.userService.restrictUser(new Id(userId), restrictReason, restrictUntil);
//   }

//   @Mutation(() => gql.User)
//   @UseGuards(Allow.Admin)
//   async releaseUser(@Args({ name: "userId", type: () => ID }) userId: string) {
//     return await this.userService.releaseUser(new Id(userId));
//   }

//   @Mutation(() => gql.User, { name: "removeUser" })
//   @UseGuards(Allow.Every)
//   async remove(@Args({ name: `userId`, type: () => ID }) userId: string, @RequiredAuth() account: Account) {
//     if (account.role !== "admin" && !account._id.equals(userId)) throw new Error("Not authorized");
//     const user = await this.userService.remove(new Id(userId));
//     await this.keyringService.remove(user.keyring);
//     return user;
//   }

//   @ResolveField(() => gql.File, { nullable: true })
//   async image(@Parent() user: gql.User) {
//     return await this.fileService.load(user.image);
//   }
// }
