
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { User } from '../../types';
import ProfileCard from './ProfileCard';

interface UserListModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  users: User[];
  onLike: (userId: string) => void;
  onMessage: (userId: string) => void;
  onViewProfile: (userId: string) => void;
}

const UserListModal = ({ 
  isOpen, 
  onClose, 
  title, 
  users, 
  onLike, 
  onMessage, 
  onViewProfile 
}: UserListModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-purple-600">
            {title} ({users.length} profiles)
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {users.map((user) => (
            <ProfileCard
              key={user.id}
              user={user}
              onLike={onLike}
              onMessage={onMessage}
              onViewProfile={onViewProfile}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserListModal;
