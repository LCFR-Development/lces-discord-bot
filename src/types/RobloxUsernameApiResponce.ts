export interface RobloxUsernameAPIResponce {
   data: Array<RobloxUserFromUsername>;
}

export interface RobloxUserFromUsername {
   requestedUsername: string;
   hasVerifiedBadge:  boolean;
   id:                number;
   name:              string;
   displayName:       string;
}
