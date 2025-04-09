import { JSX } from "react";
import StoreProvider from "./storeProvider";

export default function Home(): JSX.Element {
  return (
    <StoreProvider>
      <h2>knowledgeBase</h2>
    </StoreProvider>
  );
}
