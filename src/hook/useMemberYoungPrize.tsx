import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getListSubcribe } from "../api/youngPrize";
import _ from "lodash";
interface IProps {
  id?: string;
}
export default function useMemberSubscribe({ id }: IProps) {
  const { data: listMembers, isLoading } = useQuery(
    ["listMembersGetByF2"],
    () => getListSubcribe({ mode: 1 }),
    {
      enabled: id === undefined,
    }
  );
  const { data: getListMembersOfClubs } = useQuery(
    ["listMembersClubGetByF0", id],
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

  const [groupByName, setGroupByName] = useState<any>();
  const extractCategoryFromName = (name: string) => {
    if (name?.includes("_Quyền Quy Định")) {
      const subcategory = name.replace("_Quyền Quy Định", "");
      return {
        category: "Quyền Quy Định",
        subcategory: subcategory,
      };
    } else if (name?.includes("_Quyền Tự Chọn")) {
      const subcategory = name.replace("_Quyền Tự Chọn", "");
      return {
        category: "Quyền Tự Chọn",
        subcategory: subcategory,
      };
    } else {
      // Các môn đấu đơn lẻ
      return {
        category: name,
        subcategory: null,
      };
    }
  };

  const groupDataTableByName = (data: any) => {
    console.log("data", data);
    const result: any = {};

    const groupedByType = _.groupBy(data, "type");

    _.forEach(groupedByType, (typeRecords, type) => {
      result[type] = {};

      _.forEach(typeRecords, (record) => {
        const { category, subcategory } = extractCategoryFromName(record.name);
        console.log("Processing:", record.name, "->", category, subcategory);

        // Khởi tạo category nếu chưa có
        if (!result[type][category]) {
          result[type][category] = {};
        }

        // Luôn tạo subcategory, ngay cả khi là undefined
        // Điều này đảm bảo cấu trúc nhất quán
        if (subcategory) {
          if (!Array.isArray(result[type][category][subcategory])) {
            result[type][category][subcategory] = [];
          }
          result[type][category][subcategory].push(record);
        } else {
          // Nếu không có subcategory, có thể tạo một key mặc định
          // hoặc kiểm tra lại hàm extractCategoryFromName
          if (!Array.isArray(result[type][category])) {
            result[type][category] = [];
          }
          result[type][category].push(record);
        }
      });
    });

    return result;
  };
  useEffect(() => {
    if (listMembers) {
      const result = groupDataTableByName(listMembers?.data);

      setMultiAgeGroupState(result);
    }

    if (getListMembersOfClubs) {
      const result = groupDataTableByName(getListMembersOfClubs?.data);
      setGroupByName(result);
    }
  }, [listMembers, getListMembersOfClubs, id]);

  return {
    isLoading: isLoading,
    multiAgeGroup: multiAgeGroupState,
    groupByName: groupByName,
  };
}
