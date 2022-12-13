import axios from "axios";
import { requestInterceptor } from "./interceptors";
import { APIRoutes } from "./routes";

axios.interceptors.request.use(requestInterceptor);

export const getallReports = async (id = "") =>
  await axios.get(`${APIRoutes.reports}/${id}`);

export const getallReportApps = async (id = "") =>
  await axios.get(`${APIRoutes.reportApps}reportId=${id}`);

export const getallReportAppDetails = async (id = "") =>
  await axios.get(`${APIRoutes.reportAppDetails}reportAppId=${id}`);

export const getallCredentials = async (id = "") =>
  await axios.get(`${APIRoutes.credentials}/${id}`);

export const getallCertificates = async (id = "") =>
  await axios.get(`${APIRoutes.certificates}/${id}`);

export const getallAgencies = async (id = "") =>
  await axios.get(`${APIRoutes.agencies}/${id}`);

export const getallEnvironments = async (id = "") =>
  await axios.get(`${APIRoutes.environments}/${id}`);

export const getallPackages = async (id = "") =>
  await axios.get(`${APIRoutes.packages}/${id}`);

export const getallSignatureBoxs = async (id = "") =>
  await axios.get(`${APIRoutes.signatureBoxs}/${id}`);

export const getallSignature = async (id = "") =>
  await axios.get(`${APIRoutes.signature}/${id}`);

export const getallMessage = async (id = "") =>
  await axios.get(`${APIRoutes.errors}/${id}`);

export const addUser = async (user) =>
  await axios.post(APIRoutes.credentials, user);

export const deleteCredential = async (id) =>
  await axios.delete(`${APIRoutes.credentials}/${id}`);

export const getallOrganization = async (id = "") =>
  await axios.get(`${APIRoutes.organizations}/${id}`);

export const addOrganization = async (user) =>
  await axios.post(APIRoutes.organizations, user);

export const editUser = async (id, user) =>
  await axios.put(`${APIRoutes.credentials}/${id}`, user);

const baseURLJWT = process.env.REACT_APP_API_URL_JWT;

let res;
export const addUserPerson = async (user) =>
  await axios.post(baseURLJWT, user).then(
    (response) => {
      res = response;
      addUserToken(response.data);
    },
    (error) => {
      console.log(error);
    }
  );
export const addUserToken = async (res) =>
  await axios.post(APIRoutes.users, res);

export const getTokens = async (id = "") =>
  await axios.get(`${APIRoutes.users}/${id}`);
