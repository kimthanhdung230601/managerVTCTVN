import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getListSubcribe } from "../api/f0";
import _ from "lodash";
interface IProps {
  id?: string;
}
export default function useMemberSubscribe({ id }: IProps) {
  const { data: listMembers, isLoading } = useQuery(
    ["listMembers"],
    () => getListSubcribe({ mode: 1 }),
    {
      enabled: id === undefined,
    }
  );
  const { data: getListMembersOfClubs } = useQuery(
    ["listMembersClub", id],
    () =>
      getListSubcribe({
        mode: 1,
        idclub: id,
      }),
    {
      enabled: id !== undefined,
    }
  );
  const [multiAgeGroupState, setMultiAgeGroupState] = useState<any>();
  const [singleAgeGroupState, setSingleAgeGroupState] = useState<any>();
  const [groupByName, setGroupByName] = useState<any>();

  useEffect(() => {
    if (listMembers) {
      const multiAgeGroup = _.mapValues(
        _.groupBy(listMembers?.data, "sex"),
        (items) => {
          return _.mapValues(_.groupBy(items, "name"), (type) =>
            _.groupBy(type, "type")
          );
        }
      );
      setMultiAgeGroupState(multiAgeGroup);
    }
    if (listMembers) {
      const singleAgeGroup = _.mapValues(
        _.groupBy(listMembers?.data, "name"),
        (items) => _.groupBy(items, "type")
      );
      setSingleAgeGroupState(singleAgeGroup);
    }
    if (getListMembersOfClubs) {
      const groupByName = _.mapValues(
        _.groupBy(getListMembersOfClubs?.data, "name"),
        (items) => _.groupBy(items, "type")
      );
      setGroupByName(groupByName);
    }
  }, [listMembers, getListMembersOfClubs, id]);
  return {
    isLoading: isLoading,
    multiAgeGroup: multiAgeGroupState,
    singleAgeGroup: singleAgeGroupState,
    groupByName: groupByName,
  };
}
