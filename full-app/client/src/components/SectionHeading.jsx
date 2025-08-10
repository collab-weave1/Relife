export const SectionHeading = ({ title, subtitle, icon }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2">
        {icon && <span>{icon}</span>}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
      </div>
      {subtitle && <p className="mt-2 text-gray-600 dark:text-gray-400">{subtitle}</p>}
    </div>
  )
}
