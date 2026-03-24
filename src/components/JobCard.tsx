import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Calendar, Eye, Building2, ChevronRight } from 'lucide-react';
import { JobPosting } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface JobCardProps {
  job: JobPosting;
}

export default function JobCard({ job }: JobCardProps) {
  const date = job.createdAt && (job.createdAt as any).toDate ? (job.createdAt as any).toDate() : new Date(job.createdAt);

  return (
    <Link 
      to={`/jobs/${job.id}`}
      className="group bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-50 hover:border-blue-200 transition-all flex flex-col md:flex-row items-start md:items-center gap-6"
    >
      <div className="flex-grow space-y-3 w-full">
        <div className="flex items-center gap-2">
          <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{job.category}</span>
          <span className="text-[10px] text-gray-300 font-bold flex items-center gap-1">
            <Calendar size={10} />
            {formatDistanceToNow(date, { addSuffix: true, locale: ko })}
          </span>
        </div>
        
        <h3 className="text-xl font-black tracking-tight group-hover:text-blue-600 transition-colors leading-tight">
          {job.title}
        </h3>
        
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400 font-medium">
          <div className="flex items-center gap-1.5">
            <Building2 size={14} className="text-gray-200" />
            <span className="font-bold text-gray-600">{job.companyName}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className="text-gray-200" />
            <span>{job.location}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-8 md:pl-8 md:border-l border-gray-50">
        <div className="text-right">
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">수수료/급여</p>
          <p className="text-lg font-black text-blue-600 tracking-tight whitespace-nowrap">{job.commission}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all">
          <ChevronRight size={20} />
        </div>
      </div>
    </Link>
  );
}
