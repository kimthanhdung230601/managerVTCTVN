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
    title: "",
    dataIndex: "link",
    render: (text: string) => (
      <div>
        <a
          href={text}
          download
          style={{
            color: "initial",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "initial")}
        >
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
      link: "/assets/fileUpload/DIEU LE GIAI VO DICH VCT NAM 2024.pdf",
    },
    {
      name: "Biểu mẫu đăng ký thi đấu",
      link: "/assets/fileUpload/Bieu-mau-dang-ky-thi-dau.doc",
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
          <div className={styles.title1}>ĐIỀU LỆ</div>
          <div className={styles.subTitle1}>
            Giải Vô địch Võ cổ truyền quốc gia lần thứ XXXIII năm 2024
          </div>
          <div className={styles.des}>
            <div className={styles.subTitle2}>Mục đích</div>
            <div className={styles.content}>
              <p>
                1. Hưởng ứng Cuộc vận động "Toàn dân rèn luyện thân thể theo
                gương Bác Hồ vĩ đại" và chào mừng các ngày lễ lớn trong năm
                2024.
              </p>
              <p>
                2. Khuyến khích phong trào tập luyện Võ cỗ truyền trên toàn
                quốc, góp phần bảo tồn và phát huy các giá trị văn hóa truyền
                thống.
              </p>
              <p>
                3. Nâng cao trình độ tô chức và điều hành của cán bộ quản lý,
                chuyên môn và trọng tài, sẵn sàng tổ chức các giải đấu quốc gia
                và quốc tế.
              </p>
              <p>
                4. Đánh giá trình độ của huấn luyện viên (HLV) và vận động viên
                (VĐV) 'Võ cổ truyền, làm cơ sở xây dựng kế hoạch phát triển
                trong tương lai.
              </p>
              <p>
                5. Tạo cơ hội cho các đơn vị giao lưu, học tập kinh nghiệm, xây
                dựng cộng đồng Võ cổ truyền đoàn kết, đổi mới và phát triển.
              </p>
            </div>
            <div className={styles.subTitle2}>
              Thời gian và địa điểm thi đấu
            </div>
            <div className={styles.content}>
              <p> 1. Thời gian: từ ngày 15 đến ngày 25 tháng 9 năm 2024.</p>
              <p>
                2. Địa điểm: Nhà Thi đấu Thể dục thể thao tỉnh Gia Lai (số 11
                Trần Hưng Đạo, thành phó Pleiku, tỉnh Gia Lai).
              </p>
            </div>
          </div>
        </div>
        <div className={styles.tables}>
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
