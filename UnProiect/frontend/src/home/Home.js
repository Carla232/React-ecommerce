import DepartmentCard from "./DepartmentCard";
import Content from "./Content";
import CategoryList from "./CategoryList";
import FashionItems from "./FashionItems";
//250x350
function Home() {
  return (
    <div className="parent-container">
        <div style={{ marginTop: "100px" }}>
            <Content/>
        </div>
      <div style={{ display: "inline-block", marginRight: "20px" }}>
        <DepartmentCard
          title="Pantaloni pentru bărbați"
          images={['https://i.imgur.com/dfGAxv8.png']}
          link="#"
        />
      </div>
      <div style={{ display: "inline-block", marginRight: "20px" }}>
        <DepartmentCard
          title="Cămăși pentru copii"
          images={['https://i.imgur.com/M6yzG0D.png']}
          link="#"
        />
      </div>
      <div style={{ display: "inline-block", marginRight: "20px" }}>
        <FashionItems/>
              </div>
      <div style={{ display: "inline-block" }}>
        <DepartmentCard
          title="Accesorii pentru femei"
          images={['https://i.imgur.com/pyQ6ZtC.png']}
          link="#"
        />
      </div>
      <div style={{ marginTop: "200px", marginLeft: "300px" }}>
      <CategoryList />
      </div>
    </div>
  );
}

export default Home;
