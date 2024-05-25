import { useQuery } from "react-query";
import { getListClubs } from "../api/f1";

interface Club {
  id: string;
  name_club: string;
}

const ListClubF1 = () => {
  const { data: dataClub } = useQuery("dataClub", () => getListClubs());

  const listClub = dataClub?.data.map((item: Club, index: number) => ({
    text: item.name_club,
    value: item.id,
  }));
  return listClub;
};

export default ListClubF1;
