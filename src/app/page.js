import { Provider } from "react-redux";
import { store } from "../lib/store";
import StoreProvider from "./storeProvider";

export default function Home() {
  return (
    <StoreProvider>
      <h2>knowledgeBase</h2>
    </StoreProvider>
  );
}
