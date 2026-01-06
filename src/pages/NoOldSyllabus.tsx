// nooldsyllabus.tsx
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NoOldSyllabus = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="max-w-xl text-center bg-card p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Old Syllabus Notice</h1>
        <p className="text-sm mb-6">
          I didn’t add links to the old syllabus (2013–2019). It is{" "}
          <strong>not recommended</strong>
          to solve past papers older than 2020 within 10 days before your exam.
        </p>
        <Link to="/">
          <Button variant="default">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NoOldSyllabus;
