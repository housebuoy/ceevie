'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { LuShipWheel } from "react-icons/lu";


export default function TargetCountry() {
  const [country, setCountry] = useState("Ghana");

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#000000] text-white">
      {/* Radial background */}
      <div className="absolute top-0 h-screen w-full  bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] bg-fixed"></div>

      {/* Content */}
      <div className="w-full max-w-md md:max-w-lg px-10 py-10 z-50 bg-[#0d0d0d] rounded-xl border border-gray-800 shadow-2xl">
        <LuShipWheel className="text-4xl text-indigo-400 mb-2 mx-auto" />
        <h1 className="text-3xl font-bold text-center mb-2">
          Where are you focusing <br /> your job search?
        </h1>

        <p className="text-center text-gray-400 mb-6">
          We&apos;ll recommend the right templates for your target country.
        </p>

        <div className="space-y-4">
          <label className="text-sm font-semibold mb-2">Select a Country</label>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger className="w-full bg-[#1a1a1a] text-white border border-gray-700 py-2">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] text-white border border-gray-700">
              <SelectItem value="Ghana">Ghana</SelectItem>
              <SelectItem value="USA">United States</SelectItem>
              <SelectItem value="UK">United Kingdom</SelectItem>
              <SelectItem value="Germany">Germany</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex justify-end pt-6">
            {/* <Button variant="outline" className="text-white border-gray-600 hover:bg-gray-800">
              Back
            </Button> */}
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
