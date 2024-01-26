import axios from "axios";
import { server } from "../../server";

//warning
//this code dosent work, maybe need to use a promise
//

const getProjects = async (companyId) => {
  console.log("get projects function is triggered, userinfo-->", companyId);
  try {
    const company_id = companyId.id;
    // console.log("company id in get projects", company_id);
    await axios
      .get(`${server}/get_company_projects/${company_id}`)
      .then((res) => {
        console.log(res.data, "<-- company projects data");
        return res.data;
        //   console.log("this is the projects", res.data);
      });
  } catch (error) {
    return error;
  }
};
export default getProjects;
