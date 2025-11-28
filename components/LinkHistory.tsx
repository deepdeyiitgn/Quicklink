import React, { useEffect, useState, useContext } from "react";
import { RefreshCw, Trash2, Link as LinkIconLucide } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { UrlContext } from '../contexts/UrlContext';
import { ShortenedUrl } from "../types";
import { LoadingIcon } from "./icons/IconComponents";

interface LinkHistoryProps {
  scope: 'user' | 'admin';
}

const LinkHistory: React.FC<LinkHistoryProps> = ({ scope }) => {
  const auth = useContext(AuthContext);
  const urlContext = useContext(UrlContext);
  
  const [links, setLinks] = useState<ShortenedUrl[]>([]);
  const [loading, setLoading] = useState(true);
  const [reloading, setReloading] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;
  const navigate = useNavigate();

  const { allUrls, loading: contextLoading, deleteUrl } = urlContext || {};
  const { currentUser } = auth || {};

  useEffect(() => {
    if (!contextLoading && allUrls) {
      setLoading(true);
      let filteredLinks: ShortenedUrl[];
      if (scope === 'user' && currentUser) {
        filteredLinks = allUrls.filter(link => link.userId === currentUser.id);
      } else if (scope === 'admin' && currentUser?.isAdmin) {
        filteredLinks = allUrls;
      } else {
        filteredLinks = [];
      }
      const sorted = filteredLinks.sort((a, b) => b.createdAt - a.createdAt);
      setLinks(sorted);
      setLoading(false);
      setReloading(false);
    }
  }, [allUrls, contextLoading, scope, currentUser]);


  const handleReload = () => {
    // In a real app with server-side pagination, this would re-fetch.
    // Here we just simulate a reload effect.
    setReloading(true);
    setTimeout(() => setReloading(false), 500);
  };

  const handleDelete = async (urlId: string) => {
    if (!deleteUrl || !currentUser) return;
    if (window.confirm('Are you sure you want to permanently delete this link?')) {
        try {
            await deleteUrl(urlId, currentUser.id);
            // The context update will trigger a re-render
        } catch (error: any) {
            alert(`Failed to delete link: ${error.message}`);
        }
    }
  }

  const totalPages = Math.ceil(links.length / perPage);
  const startIdx = (currentPage - 1) * perPage;
  const currentLinks = links.slice(startIdx, startIdx + perPage);

  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const renderTimeLeft = (expiresAt: number | null) => {
    if (expiresAt === null) return "Permanent";
    const diff = expiresAt - now;
    if (diff <= 0) return "Expired";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if(days > 0) return `${days}d left`;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if(hours > 0) return `${hours}h left`;
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${minutes}m left`;
  };

  if (!currentUser) {
    return (
        <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-white">Access Denied</h1>
            <p className="text-gray-400 mt-2">Please <button onClick={() => auth?.openAuthModal('login')} className="text-brand-primary hover:underline">log in</button> to view your history.</p>
        </div>
    );
  }
  
  if (scope === 'admin' && !currentUser.isAdmin) {
       return (
        <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-white">Access Denied</h1>
            <p className="text-gray-400 mt-2">You do not have permission to view this page.</p>
        </div>
    );
  }
  
  const pageTitle = scope === 'admin' ? 'All User Link History' : 'My Link History';
  const pageDescription = scope === 'admin' ? 'Manage all links created across the platform.' : 'View and manage all the links you have created.';

  return (
    <div className="min-h-screen bg-transparent text-white px-0 py-4">
      <div className="flex items-center justify-between mb-6">
        <div>
            <h1 className="text-3xl font-semibold tracking-wide">{pageTitle}</h1>
            <p className="text-gray-400 text-sm mt-1">{pageDescription}</p>
        </div>
        <button
          onClick={handleReload}
          disabled={reloading}
          className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-brand-dark rounded-xl hover:bg-brand-primary/80 transition disabled:opacity-60"
        >
          <RefreshCw className={`w-4 h-4 ${reloading ? "animate-spin" : ""}`} />
          {reloading ? "Refreshing..." : "Reload"}
        </button>
      </div>

      {loading ? (
         <div className="text-center py-10"><LoadingIcon className="h-8 w-8 animate-spin mx-auto text-brand-primary" /></div>
      ) : links.length === 0 ? (
        <div className="text-center text-gray-500 mt-10 p-8 bg-black/20 rounded-lg">
            <LinkIconLucide className="mx-auto h-12 w-12 text-gray-600" />
            <p className="mt-4">No links found.</p>
            {scope === 'user' && <Link to="/shortener" className="text-brand-primary hover:underline mt-2 inline-block">Create your first one!</Link>}
        </div>
      ) : (
        <>
          <p className="text-gray-300 mb-3 text-sm">
            Total Links:{" "}
            <span className="text-brand-primary font-semibold">
              {links.length}
            </span>
          </p>

          <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-700">
            <table className="min-w-full border-collapse text-sm">
              <thead className="bg-gray-800/80">
                <tr>
                  <th className="border-b border-gray-700 px-3 py-2 text-left">Short Link</th>
                  {scope === 'admin' && <th className="border-b border-gray-700 px-3 py-2 text-left">User</th>}
                  <th className="border-b border-gray-700 px-3 py-2 text-left hidden md:table-cell">Original</th>
                  <th className="border-b border-gray-700 px-3 py-2 text-left">Time Left</th>
                  <th className="border-b border-gray-700 px-3 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {currentLinks.map((link) => {
                  const expired = link.expiresAt && link.expiresAt < now;
                  const user = scope === 'admin' ? auth?.users.find(u => u.id === link.userId) : null;
                  return (
                    <tr
                      key={link.id}
                      className={`transition ${ expired ? "bg-gray-800/20 text-gray-500" : "hover:bg-gray-800/60" }`}
                      onMouseEnter={() => setHoveredRow(link.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td className="px-3 py-2 text-blue-400">
                        <a href={link.shortUrl} className="hover:underline font-mono break-all" target="_blank" rel="noopener noreferrer">{link.alias}</a>
                      </td>
                      {scope === 'admin' && <td className="px-3 py-2 text-xs">{user?.name || link.userId || 'Anonymous'}</td>}
                      <td className="px-3 py-2 max-w-xs truncate hidden md:table-cell">{link.longUrl}</td>
                      <td className={`px-3 py-2 text-xs ${expired ? '' : 'text-yellow-400'}`}>{renderTimeLeft(link.expiresAt)}</td>
                      <td className="px-3 py-2 text-center">
                        <button onClick={() => handleDelete(link.id)} className="text-red-500 hover:text-red-400 p-1" aria-label="Delete link">
                            <Trash2 className="w-4 h-4"/>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-300">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-800 rounded-md disabled:opacity-40"
              >
                Prev
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-800 rounded-md disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LinkHistory;