import { useQuery } from "react-query";
import { getListClub } from "../api/f0";

interface Club {
  id: string;
  name_club: string;
}

const ListClub = () => {
  const { data: dataClub } = useQuery("dataClub", getListClub);

  const listClub = dataClub?.data.map((item: Club, index: number) => ({
    text: item.name_club,
    value: item.name_club,
  }));
  return listClub;
};

export default ListClub;
