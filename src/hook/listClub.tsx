import { useQuery } from "react-query";
import { getListClub } from "../api/f0";
import { useEffect } from "react";

interface Club {
  id: string;
  name_club: string;
}

const ListClub = () => {
  const { data: dataClub } = useQuery("dataClub", getListClub, {
    enabled: false,
  });

  const listClub = dataClub?.data.map((item: Club, index: number) => ({
    text: item.name_club,
    value: item.id,
  }));
  return listClub;
};

export default ListClub;
