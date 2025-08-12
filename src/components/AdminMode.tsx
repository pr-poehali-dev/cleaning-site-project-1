import { useState, createContext, useContext, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import Icon from '@/components/ui/icon';

interface AdminContextType {
  isAdminMode: boolean;
  toggleAdminMode: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider = ({ children }: AdminProviderProps) => {
  const [isAdminMode, setIsAdminMode] = useState(false);

  const toggleAdminMode = () => {
    setIsAdminMode(!isAdminMode);
  };

  return (
    <AdminContext.Provider value={{ isAdminMode, toggleAdminMode }}>
      {children}
      {isAdminMode && <AdminToolbar />}
    </AdminContext.Provider>
  );
};

const AdminToolbar = () => {
  return null;
};

interface EditableProps {
  children: ReactNode;
  onEdit?: () => void;
  className?: string;
}

export const Editable = ({ children, onEdit, className = "" }: EditableProps) => {
  const { isAdminMode } = useAdmin();

  if (!isAdminMode) {
    return <>{children}</>;
  }

  return (
    <div 
      className={`relative group cursor-pointer ${className}`}
      onClick={onEdit}
    >
      {children}
      <div className="absolute inset-0 bg-primary/10 border-2 border-primary border-dashed opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute top-1 right-1">
          <Icon name="Edit" size={14} className="text-primary bg-white rounded p-1" />
        </div>
      </div>
    </div>
  );
};

export const AdminToggle = () => {
  const { isAdminMode, toggleAdminMode } = useAdmin();

  return (
    <Button
      variant={isAdminMode ? "default" : "outline"}
      size="sm"
      onClick={toggleAdminMode}
      className="fixed bottom-4 right-4 z-50"
    >
      <Icon name="Settings" size={16} className="mr-1" />
      {isAdminMode ? "Выйти" : "Админ"}
    </Button>
  );
};