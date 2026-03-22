import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Save, Upload, Image as ImageIcon } from 'lucide-react';

export const Profile = () => {
  const { adminProfile, updateProfile } = useStore();
  const [about, setAbout] = useState(adminProfile.about);
  const [email, setEmail] = useState(adminProfile.email);
  const [instagram, setInstagram] = useState(adminProfile.instagram);
  const [image, setImage] = useState(adminProfile.image);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ about, email, instagram, image });
    alert('Profil bilgileri güncellendi!');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (limit to 2MB for localStorage safety)
      if (file.size > 2 * 1024 * 1024) {
        alert('Resim boyutu çok büyük! Lütfen 2MB\'dan küçük bir resim seçin.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-pink-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Profil Düzenle</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Profil Resmi</label>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-pink-200 shadow-sm shrink-0">
              <img src={image} alt="Profile Preview" className="w-full h-full object-cover" />
            </div>
            <label className="flex-1 cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-pink-500 transition-colors relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center text-gray-500">
                <Upload size={24} className="mb-1" />
                <span className="text-sm">Yeni resim seçmek için tıklayın</span>
              </div>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hakkımda Yazısı</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">İletişim E-posta</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Instagram Linki</label>
          <input
            type="url"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <Save size={20} />
          Değişiklikleri Kaydet
        </button>
      </form>
    </div>
  );
};
