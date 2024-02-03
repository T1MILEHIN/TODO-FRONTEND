import { motion, AnimatePresence } from "framer-motion";

export default function SuccessOrError({
  error,
  success,
  CreateTodoMutation,
  UpdateTheTodoMutation,
  DeleteTodoMutation
}) {
  return (
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ y: "50px", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "50px", opacity: 0 }}
          className="absolute top-2 right-0 left-0 text-center p-2 rounded-md font-mono text-2xl text-white bg-red-500"
        >
          {error}
        </motion.p>
      )}
      {UpdateTheTodoMutation && UpdateTheTodoMutation.isSuccess && (
        <motion.p
          initial={{ y: "50px", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "50px", opacity: 0 }}
          className="absolute top-2 right-0 left-0 text-center p-2 rounded-md font-mono text-2xl text-white bg-green-500"
        >
          {success}
        </motion.p>
      )}
      {CreateTodoMutation && CreateTodoMutation.isSuccess && (
        <motion.p
          initial={{ y: "50px", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "50px", opacity: 0 }}
          className="absolute top-2 right-0 left-0 text-center p-2 rounded-md font-mono text-2xl text-white bg-green-500"
        >
          {success}
        </motion.p>
      )}
      {DeleteTodoMutation && DeleteTodoMutation.isSuccess && (
        <motion.p
          initial={{ y: "50px", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "50px", opacity: 0 }}
          className="absolute top-2 right-0 left-0 text-center p-2 rounded-md font-mono text-2xl text-white bg-green-500"
        >
          {success}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
