import { DataTableDemo } from "@/components/Table";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import AddTask from "@/components/AddTask";
import { AddTaskMobile } from "@/components/AddTaskMobile";

const Home = () => {
  const [isActive, setActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="border border-black min-w-[60%] rounded text-white relative caret-transparent">
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMobile ? (
              <AddTaskMobile onClose={() => setActive(false)} />
            ) : (
              <AddTask onClose={() => setActive(false)} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <h1 className="flex justify-center items-center p-4 font-bold text-4xl">
        To do List:
      </h1>

      <Button variant="secondary" onClick={() => setActive(true)}>
        Add new Task
      </Button>

      <DataTableDemo />
    </div>
  );
};

export default Home;
