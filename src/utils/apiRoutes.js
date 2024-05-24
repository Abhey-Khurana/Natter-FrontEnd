const host=process.env.REACT_APP_DB_URL;

const registerRoute=`${host}/api/auth/register`;
const loginRoute=`${host}/api/auth/login`;
const setAvatarRoute=`${host}/api/auth/setavatar`;
const getAllRoutes=`${host}/api/auth/getAllUsers`;

const sendMessage=`${host}/api/message/addMessage`;
const getMessages=`${host}/api/message/getAllMessages`;

export {registerRoute,loginRoute,setAvatarRoute,getAllRoutes,sendMessage,getMessages,host};

