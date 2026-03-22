// // import { ReactNode } from "react";
// import type { ReactNode } from "react";

// import Sidebar from "../../src/layout/Sidebar";
// import Navbar from "../../src/layout/Header";

// interface Props {
//   children: ReactNode;
// }

// const AdminLayout = ({ children }: Props) => {
//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar />

//       <div className="flex flex-1 flex-col">
//         <Navbar />
//         <main className="flex-1 overflow-y-auto p-6">{children}</main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;
import type { ReactNode } from "react";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Header";

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-[260px] border-r">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
