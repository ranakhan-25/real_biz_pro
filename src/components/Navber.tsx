"use client";


import { Avatar, Badge, Button, InputGroup, TextField } from "@heroui/react";
import {
  Search,
  Sun,
  Grid3x3,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavbarProps } from "@/types/navbar";

const Navbar = ({
  user = {
    name: "Herry",
    role: "Super Admin",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
  },

  hasNotification = true,
  onSearch,
}: NavbarProps) => {
  return (
    <div className="flex items-center justify-between w-full h-[76px] px-8 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      {/* Left: Logo */}
    
      {/* Middle: Search */}
      <div className="flex-1 max-w-xl mx-8">
        <TextField
          aria-label="Search"
          onChange={(value) => onSearch?.(value)}
          className="w-full"
        >
          <InputGroup className="bg-gray-50/70 border border-gray-200/80 shadow-none rounded-2xl h-11 transition-colors data-[hovered=true]:bg-gray-50 data-[focus-within=true]:bg-white data-[focus-within=true]:border-gray-300">
            <InputGroup.Prefix>
              <Search className="w-4 h-4 text-gray-400" />
            </InputGroup.Prefix>
            <InputGroup.Input
              placeholder="Search modules, projects, contacts..."
              className="text-sm placeholder:text-gray-400"
            />
            <InputGroup.Suffix>
              <kbd className="px-2 py-1 text-[10px] font-medium text-gray-400 bg-white border border-gray-200 rounded-md shadow-sm">
                Ctrl + K
              </kbd>
            </InputGroup.Suffix>
          </InputGroup>
        </TextField>
      </div>

      {/* Right: Icons + Profile */}
      <div className="flex items-center gap-2">
        <Button
          isIconOnly
          variant="ghost"
          className="rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
        >
          <Sun className="w-5 h-5" />
        </Button>

        <Button
          isIconOnly
          variant="ghost"
          className="rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
        >
          <Grid3x3 className="w-5 h-5" />
        </Button>

  
          <Button
            isIconOnly
            variant="ghost"
            className="rounded-full  text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
          >
            <Bell className="w-5 h-5" />
          </Button>
          {hasNotification && (
            <Badge color="danger" className=" w border-white" />
          )}
   

        <div className="w-px h-8 bg-gray-200 mx-2" />

        {/* Profile Dropdown - shadcn */}
        <DropdownMenu>
          <DropdownMenuTrigger asChil>
            <button className="flex items-center gap-2.5 pl-1 pr-2.5 py-1.5 rounded-2xl hover:bg-gray-100 transition-colors outline-none">
              <Avatar className="w-9 h-9 ring-2 ring-white shadow-sm">
                <Avatar.Image src={user.avatarUrl} alt={user.name} />
               
              </Avatar>
          
              <ChevronDown className="w-4 h-4 text-gray-400 ml-1" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 rounded-2xl p-1.5">
            <div className="flex items-center gap-3 px-3 py-3 mb-1 border-b border-gray-100">
              <Avatar className="w-10 h-10">
                <Avatar.Image src={user.avatarUrl} alt={user.name} />
                <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
              </Avatar>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold text-gray-900">
                  {user.name}
                </span>
                <span className="text-[11px] text-gray-400">
                  {user.role}
                </span>
              </div>
            </div>

            <DropdownMenuItem className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-700 cursor-pointer">
              <User className="w-4 h-4 text-gray-500" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-700 cursor-pointer">
              <Settings className="w-4 h-4 text-gray-500" />
              User Management
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50">
              <LogOut className="w-4 h-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;