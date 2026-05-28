interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight ${
          light ? 'text-white' : 'text-dark'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lg max-w-2xl ${
            centered ? 'mx-auto' : ''
          } ${light ? 'text-white/70' : 'text-gray-600'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
