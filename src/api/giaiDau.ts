import { sendGet } from "./api";

export const getTournaments = (payload: any) =>
  sendGet(`/VCT2024?API=Info&id_stadium=${payload}`);

// giám định update điểm
export const updateTournaments = (
  stadium: any,
  judge: any,
  match: any,
  blueScore: any,
  redScore: any
) =>
  sendGet(
    `/VCT2024?API=Update&id_stadium=${stadium}&id_judge=${judge}&id_match=${match}&blue_score=${blueScore}&red_score=${redScore}`
  );

// admin update infor
export const updateInfor = (
  stadium: any,
  blueName: any,
  redName: any,
  blueTeam: any,
  redTeam: any,
  weightClass: any,
  gender: any
) =>
  sendGet(
    `/VCT2024?API=Update_Matches&id_stadium=${stadium}&blue_name=${blueName}&red_name=${redName}&blue_team=${blueTeam}&red_team=${redTeam}&weight_class=${weightClass}&gender=${gender}`
  );

// reset điểm về 0
export const reset = (stadium: any) =>
  sendGet(`/VCT2024?API=Reset&id_stadium=${stadium}`);

// admin visiable
export const updateVisitable = (stadium: any, roundId: any, visitable: any) =>
  sendGet(
    `/VCT2024?API=Update_Visible&id_stadium=${stadium}&round_id=${roundId}&visible=${visitable}`
  );
