import AdminManagement from "../Thu_thap_du_lieu_doi_khang";

interface TabAnagonismProps {
  idClub: number | undefined;
}

const TabAnagonism = ({ idClub }: TabAnagonismProps) => {
  return (
    <>
      <AdminManagement
        isNotShowTitle={true}
        idClub={idClub}
        isEdiTable={true}
      />
    </>
  );
};

export default TabAnagonism;
