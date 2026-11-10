import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-brand-purple/10 text-brand-purple flex items-center justify-center mb-8">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>
        <span className="text-sm font-mono text-brand-purple font-bold uppercase tracking-widest block mb-2">
          Error 404
        </span>
        <h1 className="text-4xl font-extrabold text-text-main dark:text-text-main-dark mb-4">
          Route Not Found
        </h1>
        <p className="text-text-muted dark:text-text-muted-dark mb-8 leading-relaxed">
          The page you are looking for does not exist or has been relocated to another growth channel.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/">
            <Button className="w-full sm:w-auto rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return Home
            </Button>
          </Link>
          <Link to="/services">
            <Button variant="outline" className="w-full sm:w-auto rounded-xl">
              Explore Services
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

