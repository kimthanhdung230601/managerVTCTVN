import React, { useState } from "react";
import styles from "./styles.module.scss";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";
import Header from "../../components/Header";
import * as XLSX from "xlsx";

import Subcribe from "./Subcribe";
import { Tabs, Input, Button, message } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { getManagamentMember, updateFile } from "../../api/youngPrize";
import { useQuery } from "react-query";
import { getInfoF2 } from "../../api/youngPrize";
import { useParams } from "react-router";
import AdminManagement from "../giaidau/Thu_thap_du_lieu_doi_khang";
import AdminManagementYpungPrize from "../giaidau_giaitre/Thu_thap_du_lieu_doi_khang";

const secretKey = process.env.REACT_APP_SECRET_KEY as string;
interface ManagementMember {
  name?: string;
  sex?: string;
  hoTen?: string;
  tenClb?: string;
  birthday?: any;
  code?: string;
  type?: string;
  // Add any other fields here if needed
}

type FieldMapping = [keyof ManagementMember, string];
export default function F0AcceptFileGiaiTre() {
  const { id } = useParams();

  const { data: infoF2 } = useQuery(["info"], () => getInfoF2(id));
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle form submission
  const handleSubmit = async (value: number) => {
    setIsLoading(true);
    const fileUrl = infoF2?.image[value].image;

    if (!fileUrl) {
      message.error("Không tìm thấy file.");
      setIsLoading(false);

      return;
    }

    const fileName = fileUrl.split("/").pop();
    if (!fileName) {
      console.error("Không tìm thấy file.");
      setIsLoading(false);

      return;
    }

    try {
      // Fetch the file data
      const response = await fetch(
        `https://vocotruyen.id.vn/PHP_IMG/${fileName}`
      );
      const blob = await response.blob();

      // Create an object URL for the blob
      const downloadUrl = window.URL.createObjectURL(blob);

      // Create a temporary <a> element for downloading
      const link = document.createElement("a");
      link.href = downloadUrl;

      // Set the new file name
      link.setAttribute(
        "download",
        `Giáy giới thiệu CLB ${infoF2?.data[0].nameClb}`
      );

      document.body.appendChild(link);
      link.click();

      // Clean up the object URL and the <a> element
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching the PDF:", error);
      setIsLoading(false);
    }
  };
  //xuất file excel
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
    return dateStr; // Return the original string if invalid date
  };

  // Helper function to map fields to custom column names
  const mapFieldsToColumns = (
    data: ManagementMember[],
    mapping: FieldMapping[]
  ): Record<string, any>[] => {
    return data.map((item) => {
      const newItem: Record<string, any> = {};
      mapping.forEach(([value1, value2]) => {
        if (value1 === "birthday" && item[value1]) {
          newItem[value2] = formatDate(item[value1]!); // Format birthday field
        } else {
          newItem[value2] = item[value1]; // Copy field to new column
        }
      });
      return newItem;
    });
  };

  const handelExportFileEcxel = async () => {
    try {
      // Simulate fetching data from API
      const resDauKhang: { data: ManagementMember[] } =
        await getManagamentMember({ mode: 2, idclub: id });
      const resQuyenThuat: { data: ManagementMember[] } =
        await getManagamentMember({ mode: 1, idoclub: id });

      // Define mapping: [value1 (field in data), value2 (Excel column name)]
      const fieldMappingDauKhang: FieldMapping[] = [
        ["name", "Hạng cân"],
        ["sex", "Giới tính"],
        ["hoTen", "Họ và tên"],
        ["birthday", "Ngày sinh"],
        ["tenClb", "Đơn vị"],
        ["code", "Mã định danh"],
      ];
      const fieldMappingVoquyen: FieldMapping[] = [
        ["name", "Nội dung"],
        ["type", "Nhóm tuổi"],
        ["sex", "Giới tính"],
        ["hoTen", "Họ và tên"],
        ["birthday", "Ngày sinh"],
        ["tenClb", "Đơn vị"],
        ["code", "Mã định danh"],
      ];

      // Map fields to custom column names for both datasets
      const filteredDauKhang1 = mapFieldsToColumns(
        resDauKhang?.data?.filter((item) => item.type === "hinh_thuc_1") || [],
        fieldMappingDauKhang
      );
      console.log("filteredDauKhang1", filteredDauKhang1);

      const filteredDauKhang2 = mapFieldsToColumns(
        resDauKhang?.data?.filter((item) => item.type === "hinh_thuc_2") || [],
        fieldMappingDauKhang
      );
      const filteredQuyenThuat = mapFieldsToColumns(
        resQuyenThuat?.data || [],
        fieldMappingVoquyen
      );

      // Create a new workbook
      const workbook = XLSX.utils.book_new();

      // Helper function to handle merges based on 'name' field
      const addMergeToWorksheet = (
        worksheet: any,
        data: any[],
        column: string
      ) => {
        let merges = [];
        let startRow = 1; // Row index for data (Excel rows start at 1)
        for (let i = 1; i < data.length; i++) {
          if (data[i][column] !== data[i - 1][column]) {
            if (i - startRow > 1) {
              merges.push({
                s: { r: startRow, c: 0 }, // start cell
                e: { r: i - 1, c: 0 }, // end cell
              });
            }
            startRow = i;
          }
        }
        if (data.length - startRow > 1) {
          merges.push({
            s: { r: startRow, c: 0 },
            e: { r: data.length - 1, c: 0 },
          });
        }
        worksheet["!merges"] = merges;
      };

      // Convert filtered `resDauKhang` data to a worksheet
      const wsDauKhang1 = XLSX.utils.json_to_sheet(filteredDauKhang1);
      // Set column width for Sheet1
      wsDauKhang1["!cols"] = Array(
        Object.keys(filteredDauKhang1[0] || {}).length
      ).fill({ wpx: 170 });
      // Merge cells in the 'name' column (first column)
      addMergeToWorksheet(wsDauKhang1, filteredDauKhang1, "Hạng cân");

      // Append the worksheet to the workbook
      XLSX.utils.book_append_sheet(
        workbook,
        wsDauKhang1,
        "Hinh_Thuc_Dau_Khang1"
      );
      // --------------------------------------------------------------------------------doi_khang_2
      const wsDauKhang2 = XLSX.utils.json_to_sheet(filteredDauKhang2);
      // Set column width for Sheet1
      wsDauKhang2["!cols"] = Array(
        Object.keys(filteredDauKhang2[0] || {}).length
      ).fill({ wpx: 170 });
      // Merge cells in the 'name' column (first column)
      addMergeToWorksheet(wsDauKhang1, filteredDauKhang2, "Hạng cân");

      // Append the worksheet to the workbook
      XLSX.utils.book_append_sheet(
        workbook,
        wsDauKhang2,
        "Hinh_thuc__Dau_Khang2"
      );
      // Convert filtered `resQuyenThuat` data to a worksheet
      const wsQuyenThuat = XLSX.utils.json_to_sheet(filteredQuyenThuat);
      // Set column width for Sheet2
      wsQuyenThuat["!cols"] = Array(
        Object.keys(filteredQuyenThuat[0] || {}).length
      ).fill({ wpx: 170 });
      // Merge cells in the 'name' column (first column)
      addMergeToWorksheet(wsQuyenThuat, filteredQuyenThuat, "Nội dung");

      // Append the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, wsQuyenThuat, "Quyen_Thuat");

      // Generate and download the Excel file
      XLSX.writeFile(workbook, "DanhSachThiDau.xlsx");

      console.log("Export successful!");
    } catch (error) {
      console.error("Error exporting file:", error);
    }
  };

  const onChange = (key: string) => {
    // console.log(key);
  };

  return (
    <div>
      <Header />
      <div className={styles.logoWrap}>
        <div className={styles.title}>
          <div className={styles.logoContainer}>
            <Logo />
          </div>
          <div className={styles.titleContent}>
            <div className={styles.titleText}>
              {infoF2?.data && <> Đơn vị: {infoF2?.data[0].nameClb}</>}
            </div>
          </div>
        </div>
      </div>
      {/* f0 sửa hồ sơ */}
      <div
        style={{
          marginLeft: "30%",
          marginRight: "30%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {" "}
          <Button
            type="primary"
            onClick={() => handleSubmit(0)}
            style={{ marginBottom: "36px" }}
            disabled={isLoading}
          >
            Tải giấy giới thiệu đối kháng
          </Button>
          <Button
            type="primary"
            onClick={() => handleSubmit(1)}
            style={{ marginBottom: "36px" }}
            disabled={isLoading}
          >
            Tải giấy giới thiệu giải quyền thuật
          </Button>
        </div>
      </div>
      <div
        style={{
          marginLeft: "30%",
          marginRight: "30%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Button
          type="primary"
          onClick={handelExportFileEcxel}
          style={{ marginBottom: "36px" }}
          // disabled={isLoading}
        >
          Xuất file excel
        </Button>
      </div>
      <Tabs defaultActiveKey="0" onChange={onChange} centered>
        <TabPane key={0} tab="Dữ liệu đối kháng hình thức">
          <AdminManagementYpungPrize idClub={Number(id)} />
        </TabPane>
        <TabPane key={1} tab="Dữ liệu quyền thuật">
          <Subcribe />
        </TabPane>
      </Tabs>
    </div>
  );
}
