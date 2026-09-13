"use client";

import { motion } from "framer-motion";
import {
  Bell,
  ChevronDown,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

export default function AdminTopbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header
      className="
        sticky top-0 z-30
        flex
        h-16
        w-full
        items-center
        justify-between
        gap-2
        border-b border-slate-200
        bg-white/90
        px-3
        backdrop-blur-xl
        sm:px-4
        md:h-[68px]
        md:px-5
        lg:h-[72px]
        lg:px-7
      "
    >
      {/* =====================================================
          LEFT / SEARCH
      ====================================================== */}
      <div className="flex min-w-0 flex-1 items-center">
        {/* Desktop + Tablet Search */}
        <div
          className={`
            relative
            hidden
            sm:block
            ${searchOpen ? "max-w-full" : ""}
          `}
        >
          <Search
            size={17}
            strokeWidth={1.8}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="search"
            placeholder="Search anything..."
            aria-label="Search"
            className="
              h-10
              w-[220px]
              rounded-lg
              border border-slate-200
              bg-slate-50
              pl-10
              pr-4
              text-sm
              text-slate-700
              placeholder:text-slate-400
              outline-none
              transition-all
              focus:border-[#1D6BB2]
              focus:bg-white
              focus:ring-4
              focus:ring-[#1D6BB2]/10
              md:w-[260px]
              lg:w-[300px]
            "
          />
        </div>

        {/* Mobile Search Button */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={() => setSearchOpen((prev) => !prev)}
          aria-label="Open search"
          aria-expanded={searchOpen}
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-lg
            border border-slate-200
            bg-slate-50
            text-slate-500
            transition
            hover:bg-white
            hover:text-[#1D6BB2]
            sm:hidden
          "
        >
          <Search size={18} strokeWidth={1.8} />
        </motion.button>

        {/* Mobile Expandable Search */}
        {searchOpen && (
          <motion.div
            initial={{
              opacity: 0,
              width: 0,
            }}
            animate={{
              opacity: 1,
              width: "100%",
            }}
            exit={{
              opacity: 0,
              width: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              relative
              ml-2
              min-w-0
              overflow-hidden
              sm:hidden
            "
          >
            <Search
              size={16}
              strokeWidth={1.8}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="search"
              autoFocus
              placeholder="Search..."
              aria-label="Search"
              className="
                h-10
                w-full
                rounded-lg
                border border-slate-200
                bg-slate-50
                pl-9
                pr-3
                text-sm
                text-slate-700
                placeholder:text-slate-400
                outline-none
                transition
                focus:border-[#1D6BB2]
                focus:bg-white
                focus:ring-4
                focus:ring-[#1D6BB2]/10
              "
            />
          </motion.div>
        )}
      </div>

      {/* =====================================================
          RIGHT ACTIONS
      ====================================================== */}
      <div
        className="
          flex
          shrink-0
          items-center
          gap-1.5
          sm:gap-3
          md:gap-4
          lg:gap-5
        "
      >
        {/* =================================================
            NOTIFICATION
        ================================================== */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Notifications"
          className="
            relative
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            text-slate-500
            transition-colors
            hover:bg-slate-100
            hover:text-[#1D6BB2]
            sm:h-10
            sm:w-10
          "
        >
          <Bell
            size={18}
            strokeWidth={1.8}
          />

          {/* Notification Dot */}
          <span
            className="
              absolute
              right-1.5
              top-1.5
              h-2
              w-2
              rounded-full
              bg-[#1D6BB2]
              ring-2
              ring-white
            "
          />
        </motion.button>

        {/* Divider */}
        <div
          className="
            h-6
            w-px
            shrink-0
            bg-slate-200
            sm:h-7
          "
        />

        {/* =================================================
            ADMIN PROFILE
        ================================================== */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          aria-label="Open administrator menu"
          className="
            flex
            min-w-0
            shrink-0
            items-center
            gap-1.5
            rounded-lg
            py-1
            transition
            sm:gap-2.5
            md:gap-3
          "
        >
          {/* Avatar */}
          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#1D6BB2]/10
              text-[#1D6BB2]
              sm:h-10
              sm:w-10
            "
          >
            <ShieldCheck
              size={18}
              strokeWidth={1.9}
            />
          </div>

          {/* Profile Information */}
          <div
            className="
              hidden
              min-w-0
              text-left
              sm:block
            "
          >
            <p
              className="
                truncate
                text-xs
                font-semibold
                leading-4
                text-slate-800
                md:text-[13px]
              "
            >
              Super Admin
            </p>

            <p
              className="
                truncate
                text-[10px]
                leading-4
                text-slate-400
                md:text-[11px]
              "
            >
              Administrator
            </p>
          </div>

          {/* Dropdown Icon */}
          <ChevronDown
            size={15}
            strokeWidth={1.8}
            className="
              shrink-0
              text-slate-400
            "
          />
        </motion.button>
      </div>
    </header>
  );
}

