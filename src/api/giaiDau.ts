import { sendGet } from "./api";

export const getTournaments = (payload: any) =>
  sendGet(`/VCT2024?API=Info&id_stadium=${payload}`);

// giám định update điểm
export const updateTournaments = (
  stadium: any,
  judge: any,
  blueScore: any,
  redScore: any
) =>
  sendGet(
    `/VCT2024?API=Update&id_stadium=${stadium}&id_judge=${judge}&blue_score=${blueScore}&red_score=${redScore}`
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
//
//uppdate winner
export const updateWinner = (stadium: any, roundId: any, winner: any) =>
  sendGet(
    `/VCT2024?API=Update_Win&id_stadium=${stadium}&round_id=${roundId}&win=${winner}`
  );

//uppdate thư ký sẽ gửi điểm ở hiệp nào
export const updateRound = (stadium: any, roundId: any) =>
  sendGet(
    `VCT2024?API=Update_Choose&id_stadium=${stadium}&round_id=${roundId}`
  );
