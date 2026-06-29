import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Dynamic branding/graphics */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary/5 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-0" />
        <div className="z-10 p-12 text-center">
          <div className="kavan-logo-wrap mx-auto mb-8">
            <div className="k6-corner-rotate kavan-logo-box rounded-2xl shadow-2xl" />
            <div className="kavan-logo-content">
              <span className="kavan-logo-k">K</span>
              <div className="kavan-logo-name">
                <span className="kavan-white">KAV</span><span className="kavan-orange">AN</span>
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight mb-4 gradient-text">
            KAVAN v6.0
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            Enterprise Role-Based Access Control Platform. Secure, Scalable, Seamless.
          </p>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-1/4 -left-12 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-12 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      {/* Right side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 z-0" />
        <div className="w-full max-w-md relative z-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
