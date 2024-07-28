import { Image } from "antd";
import Header from "../../components/Header";
import styles from "./Style.module.scss";
import Table, { ColumnsType } from "antd/es/table";

interface DataTypeFile {
  name: string;
  link: string;
}

const columns_file: ColumnsType<DataTypeFile> = [
  {
    title: "STT",
    dataIndex: "key",
    render: (_, __, index) => index + 1,
  },
  {
    title: "Tên tệp",
    dataIndex: "name",
  },
  {
    title: "Tải xuống",
    dataIndex: "link",
    render: (text: string) => (
      <div>
        <a href={text} download>
          Tải xuống
        </a>
      </div>
    ),
  },
];

const RegisterForPrize = () => {
  const data: DataTypeFile[] = [
    {
      name: "Điều lệ giải vô địch VCT Việt Nam",
      link: require("../../assets/fileUpload/DIEU LE GIAI VO ĐICH VCT NAM 2024.pdf"),
    },
    {
      name: "Biểu mẫu đăng ký thi đấu",
      link: require("../../assets/fileUpload/Biểu mẫu đăng ký thi đấu ( các đơn vị kê khai).doc"),
    },
  ];

  return (
    <>
      <Header />
      <div className={styles.wrap}>
        <div className={styles.imageWrap}>
          <Image
            src={require("../../assets/image/logo.png")}
            preview={false}
            className={styles.img}
          />
          <div className={styles.title}>ĐĂNG KÝ GIẢI VÔ ĐỊCH</div>
        </div>
        <div className={styles.content}>
          <Table
            columns={columns_file}
            dataSource={data}
            className={styles.table}
            pagination={false}
          />
        </div>
      </div>
    </>
  );
};

export default RegisterForPrize;
