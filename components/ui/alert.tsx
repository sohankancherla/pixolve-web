import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/20/solid';

export default function Alert({
  color,
  text,
}: {
  color: 'green' | 'red' | 'blue' | 'yellow';
  text: string;
}) {
  if (color === 'green') {
    return (
      <div className="flex rounded-md bg-green-100 dark:bg-green-950 p-3">
        <CheckCircleIcon
          className="h-5 w-5 flex-shrink-0 text-green-400"
          aria-hidden="true"
        />
        <p className="text-sm text-green-800 dark:text-green-300 ml-3">
          {text}
        </p>
      </div>
    );
  } else if (color === 'red') {
    return (
      <div className="flex rounded-md bg-red-100 dark:bg-red-950 p-3">
        <XCircleIcon
          className="h-5 w-5 flex-shrink-0 text-red-400"
          aria-hidden="true"
        />
        <p className="text-sm text-red-800 dark:text-red-300 ml-3">{text}</p>
      </div>
    );
  } else if (color === 'blue') {
    return (
      <div className="flex rounded-md bg-blue-100 dark:bg-blue-950 p-3">
        <InformationCircleIcon
          className="h-5 w-5 flex-shrink-0 text-blue-400"
          aria-hidden="true"
        />
        <p className="text-sm text-blue-800 dark:text-blue-300 ml-3">{text}</p>
      </div>
    );
  } else if (color === 'yellow') {
    return (
      <div className="flex rounded-md bg-yellow-100 dark:bg-yellow-950 p-3">
        <ExclamationTriangleIcon
          className="h-5 w-5 flex-shrink-0 text-yellow-400"
          aria-hidden="true"
        />
        <p className="text-sm text-yellow-800 dark:text-yellow-300 ml-3">
          {text}
        </p>
      </div>
    );
  }
}
