interface PhoneMockupProps {
  imageSrc: string;
  alt: string;
  className?: string;
}

export default function PhoneMockup({ imageSrc, alt, className = '' }: PhoneMockupProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl">
        <div className="absolute top-0 w-[3px] h-[16px] bg-gray-800 rounded-full left-1/2 -translate-x-1/2 -mt-2 z-10" />
        <div className="rounded-[2rem] overflow-hidden h-full w-full bg-white">
          <img src={imageSrc} alt={alt} className="h-full w-full object-cover" loading="lazy" />
        </div>
      </div>
    </div>
  );
}
