import { useSelector } from "react-redux";
import userSlice from "./src/slices/user";
import { useAppDispatch } from "./src/store";
import { RootState } from "./src/store/reducer";

const dispatch = useAppDispatch();

// Redux user store에 저장된 데이터 갖고오기
const email = useSelector((state: RootState) => state.user.email);

// Redux user store에 데이터 저장하기
dispatch(
    userSlice.actions.setUser({
      name: "저장할 이름",
      email: "저장할 이메일",
      accessToken: "저장할 토큰",
    }),
  );