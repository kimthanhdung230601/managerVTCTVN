import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import vi_VN from "antd/es/locale/vi_VN";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 24 * 3600 * 1000, // cache for 1 day
      retry: false,
    },
  },
});
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider
            locale={vi_VN}
            theme={{
              token: {
                colorPrimary: "#046c39",
                colorPrimaryBorder: "#046c39",
                colorPrimaryHover: "#b4ddc194",
              },
            }}
          >
            <QueryClientProvider client={queryClient}>
              <BrowserRouter>
                <Suspense fallback={null}>
                  <App />
                </Suspense>
              </BrowserRouter>
            </QueryClientProvider>
          </ConfigProvider>
        </QueryClientProvider>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
