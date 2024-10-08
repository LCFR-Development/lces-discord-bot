import erlc from "erlc-api";

export interface ExtendedServerPlayer extends erlc.ServerPlayer{
    Callsign: string | undefined;
    Team: string;
}
