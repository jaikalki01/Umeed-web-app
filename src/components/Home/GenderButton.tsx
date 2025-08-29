import { Button } from '@/components/ui/button';

import allBg from '/public/img/all-bg.jpg';
import lesbianBg from '/public/img/lesbian-bg.jpg';
import gayBg from '/public/img/gay-bg.jpg';
import bisexualManBg from '/public/img/bisexual-man-bg.jpg';
import bisexualWomanBg from '/public/img/bisexual-woman-bg.jpg';

import transgenderManBg from '/public/img/transgender-man-bg.jpg';
import transgenderWomanBg from '/public/img/transgender-woman-bg.jpg';
import queerBg from '/public/img/queer-bg.jpg';

import intersexBg from '/public/img/intersex-bg.jpg';
import asexualBg from '/public/img/asexual-bg.jpg';
import nonbinaryBg from '/public/img/nonbinary-bg.jpg';


interface GenderButtonProps {
  gender: string;
  count: number;
  onClick: (gender: string) => void;
}

const GenderButton = ({ gender, count, onClick }: GenderButtonProps) => {
  const getGradientClass = (gender: string) => {
    const gradients = {
      All: 'from-purple-400 to-pink-400',
      Lesbian: 'from-pink-400 to-rose-500',
      Gay: 'from-blue-400 to-indigo-500',
      'Bisexual | Man': 'from-purple-400 to-pink-400',
      'Bisexual | Woman': 'from-pink-400 to-purple-400',
      'Transgender | Man': 'from-blue-300 to-pink-300',
      'Transgender | Women': 'from-pink-300 to-blue-300',
      Queer: 'from-green-400 to-purple-400',
      Intersex: 'from-yellow-400 to-purple-400',
      Asexual: 'from-gray-400 to-purple-400',
      Nonbinary: 'from-yellow-300 to-purple-300',
      '+ PLUS': 'from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400',
    };
    return gradients[gender as keyof typeof gradients] || 'from-purple-400 to-pink-400';
  };

  const getBackgroundImageForGender = (gender: string) => {
   const images: Record<string, string> = {
  All: allBg,
  Lesbian: lesbianBg,
  Gay: gayBg,
  'Bisexual | Man': bisexualManBg,
  'Bisexual | Woman': bisexualWomanBg,
  'Transgender | Man': transgenderManBg,
  'Transgender | Women': transgenderWomanBg,
  Queer: queerBg,
  Intersex: intersexBg,
  Asexual: asexualBg,
  Nonbinary: nonbinaryBg,
  '+ PLUS': '/img/plus-bg.png',
};

    return images[gender] || null;
  };

  const bgImage = getBackgroundImageForGender(gender);

  return (
    <Button
      onClick={() => onClick(gender)}
      className={`relative overflow-hidden bg-gradient-to-r ${getGradientClass(
        gender
      )} hover:scale-105 transition-transform duration-200 text-white font-medium rounded-xl shadow-lg min-w-[120px] flex-shrink-0 p-[50px]`}
    >
      {bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url('${bgImage}')` }}
        />
      )}

      <div className="text-center relative z-10">
        <div className="text-sm font-semibold">{gender}</div>
        <div className="text-xs opacity-90">{count} profiles</div>
      </div>
    </Button>
  );
};

export default GenderButton;
