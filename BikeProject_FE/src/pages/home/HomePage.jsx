import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bikes } from '@/app/data/mockData';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import authAPI from '../../services/authAPI';
import { getRoleRoute, isAuthenticated, getRoleId } from '../../utils/auth';
import {
    Search,
    Bike,
    ShieldCheck,
    MessageSquare,
    TrendingUp,
    Users,
    Star,
    ArrowRight,
    CheckCircle,
    Zap,
    Globe,
    Lock,
    X,
} from 'lucide-react';

export default function HomePage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState('');

    // Auto redirect nếu đã login
    useEffect(() => {
        if (isAuthenticated()) {
            const roleId = getRoleId();
            navigate(getRoleRoute(roleId));
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        try {
            setLoginLoading(true);
            const response = await authAPI.login({ email, password });
            localStorage.setItem('accessToken', response.token);
            localStorage.setItem('userId', response.userId || '');
            localStorage.setItem('fullName', response.fullName || '');
            localStorage.setItem('role', String(response.role));
            localStorage.setItem('access_token', response.token);
            const roleRoute = getRoleRoute(response.role);
            navigate(roleRoute, { replace: true });
        } catch (err) {
            console.error('Login error:', err);
            setLoginError('Email hoặc mật khẩu không đúng.');
        } finally {
            setLoginLoading(false);
        }
    };

    const openLogin = () => {
        setEmail('');
        setPassword('');
        setLoginError('');
        setShowLogin(true);
    };

    const featuredBikes = bikes.filter(b => b.status === 'active').slice(0, 6);
    const categories = [
        { name: 'Xe đạp địa hình', type: 'Mountain Bike', icon: '🏔️', count: 45 },
        { name: 'Xe đạp đường trường', type: 'Road Bike', icon: '🚴', count: 38 },
        { name: 'Xe đạp thành phố', type: 'City Bike', icon: '🌆', count: 52 },
        { name: 'Xe đạp điện', type: 'Electric Bike', icon: '⚡', count: 28 },
        { name: 'Xe đạp touring', type: 'Touring Bike', icon: '🗺️', count: 19 },
        { name: 'Xe đạp trẻ em', type: 'Kids Bike', icon: '👶', count: 34 },
    ];

    const features = [
        {
            icon: ShieldCheck,
            title: 'Kiểm định chuyên nghiệp',
            description: 'Mọi xe đều được kiểm tra kỹ lưỡng bởi chuyên gia',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
        },
        {
            icon: Lock,
            title: 'Thanh toán an toàn',
            description: 'Hệ thống đặt cọc và thanh toán bảo mật',
            color: 'text-green-600',
            bgColor: 'bg-green-50',
        },
        {
            icon: MessageSquare,
            title: 'Chat trực tiếp',
            description: 'Liên hệ người bán nhanh chóng và tiện lợi',
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
        },
        {
            icon: Globe,
            title: 'Giao hàng toàn quốc',
            description: 'Kết nối logistics, giao hàng mọi nơi',
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
        },
    ];

    const stats = [
        { label: 'Xe đạp đang bán', value: '500+', icon: Bike },
        { label: 'Người dùng', value: '10K+', icon: Users },
        { label: 'Giao dịch thành công', value: '2K+', icon: TrendingUp },
        { label: 'Đánh giá 5 sao', value: '98%', icon: Star },
    ];

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/buyer?search=${encodeURIComponent(searchQuery)}`);
        } else {
            navigate('/buyer');
        }
    };

    const handleCategoryClick = (type) => {
        navigate(`/buyer?type=${encodeURIComponent(type)}`);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b bg-white sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Bike className="h-8 w-8 text-blue-600" />
                            <span className="font-bold text-xl">BikeMarket</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" onClick={openLogin}>
                                Mua xe
                            </Button>
                            <Button variant="ghost" onClick={openLogin}>
                                Bán xe
                            </Button>
                            <Button onClick={openLogin}>Đăng nhập</Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Nền tảng mua bán xe đạp
                            <br />
                            <span className="text-blue-600">uy tín &amp; chuyên nghiệp</span>
                        </h1>
                        <p className="text-gray-600 text-lg mb-8">
                            Kết nối người mua và người bán với hệ thống kiểm định chất lượng,
                            thanh toán an toàn và hỗ trợ logistics toàn quốc
                        </p>

                        {/* Search Bar */}
                        <div className="flex gap-2 max-w-2xl mx-auto">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    placeholder="Tìm kiếm xe đạp theo tên, thương hiệu, loại..."
                                    className="pl-10 h-12"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </div>
                            <Button size="lg" onClick={handleSearch} className="h-12 px-8">
                                <Search className="mr-2 h-5 w-5" />
                                Tìm kiếm
                            </Button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div key={index} className="text-center">
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                                        <Icon className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <p className="text-2xl font-bold mb-1">{stat.value}</p>
                                    <p className="text-sm text-gray-600">{stat.label}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-3">Danh mục xe đạp</h2>
                        <p className="text-gray-600">Khám phá các loại xe đạp phổ biến</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categories.map((category, index) => (
                            <Card
                                key={index}
                                className="hover:shadow-lg transition-shadow cursor-pointer"
                                onClick={() => handleCategoryClick(category.type)}
                            >
                                <CardContent className="p-6 text-center">
                                    <div className="text-4xl mb-3">{category.icon}</div>
                                    <h3 className="font-medium mb-1 text-sm">{category.name}</h3>
                                    <p className="text-xs text-gray-600">{category.count} xe</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Bikes */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Xe đạp nổi bật</h2>
                            <p className="text-gray-600">Những chiếc xe đạp chất lượng cao</p>
                        </div>
                        <Button variant="outline" onClick={() => navigate('/buyer')}>
                            Xem tất cả
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredBikes.map((bike) => (
                            <Card
                                key={bike.id}
                                className="hover:shadow-xl transition-all cursor-pointer group"
                                onClick={openLogin}
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={bike.images[0]}
                                        alt={bike.title}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {bike.verified && (
                                        <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                                            <ShieldCheck className="h-3 w-3 mr-1" />
                                            Đã kiểm định
                                        </Badge>
                                    )}
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="font-medium mb-2 line-clamp-1">{bike.title}</h3>
                                    <p className="text-sm text-gray-600 mb-3">
                                        {bike.brand} • {bike.type}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-blue-600 font-bold">
                                            {bike.price.toLocaleString('vi-VN')} ₫
                                        </p>
                                        <Badge variant="secondary">{bike.condition}</Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-3">Tại sao chọn BikeMarket?</h2>
                        <p className="text-gray-600">
                            Nền tảng mua bán xe đạp toàn diện với nhiều tính năng ưu việt
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="text-center">
                                    <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.bgColor} rounded-2xl mb-4`}>
                                        <Icon className={`h-8 w-8 ${feature.color}`} />
                                    </div>
                                    <h3 className="font-medium mb-2">{feature.title}</h3>
                                    <p className="text-sm text-gray-600">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-3">Cách thức hoạt động</h2>
                        <p className="text-gray-600">Quy trình đơn giản và minh bạch</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: '1', title: 'Tìm kiếm xe', desc: 'Duyệt và lọc xe theo nhu cầu', icon: Search },
                            { step: '2', title: 'Liên hệ người bán', desc: 'Chat trực tiếp, hỏi thông tin', icon: MessageSquare },
                            { step: '3', title: 'Kiểm tra xe', desc: 'Xem báo cáo kiểm định chi tiết', icon: ShieldCheck },
                            { step: '4', title: 'Đặt mua an toàn', desc: 'Thanh toán và nhận xe', icon: CheckCircle },
                        ].map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="relative">
                                    <div className="text-center">
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4 relative">
                                            <Icon className="h-8 w-8" />
                                            <span className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-sm font-bold text-white">
                                                {item.step}
                                            </span>
                                        </div>
                                        <h3 className="font-medium mb-2">{item.title}</h3>
                                        <p className="text-sm text-gray-600">{item.desc}</p>
                                    </div>
                                    {index < 3 && (
                                        <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gray-300">
                                            <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <Zap className="h-16 w-16 mx-auto mb-6 opacity-90" />
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Sẵn sàng bắt đầu?</h2>
                    <p className="text-lg mb-8 text-blue-50">
                        Tham gia cộng đồng BikeMarket ngay hôm nay để mua bán xe đạp dễ dàng và an toàn
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            variant="outline"
                            className="bg-white text-blue-600 hover:bg-blue-50 border-white"
                            onClick={openLogin}
                        >
                            <Search className="mr-2 h-5 w-5" />
                            Tìm xe ngay
                        </Button>
                        <Button
                            size="lg"
                            className="bg-orange-500 hover:bg-orange-600 text-white border-0"
                            onClick={openLogin}
                        >
                            <Bike className="mr-2 h-5 w-5" />
                            Đăng bán xe
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Bike className="h-6 w-6 text-blue-400" />
                                <span className="font-bold text-white text-xl">BikeMarket</span>
                            </div>
                            <p className="text-sm">
                                Nền tảng mua bán xe đạp uy tín hàng đầu Việt Nam
                            </p>
                        </div>
                        <div>
                            <h4 className="font-medium text-white mb-4">Về chúng tôi</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Giới thiệu</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Liên hệ</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Tuyển dụng</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium text-white mb-4">Hỗ trợ</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Trung tâm trợ giúp</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Chính sách</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Điều khoản</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium text-white mb-4">Kết nối</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Youtube</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-sm text-center">
                        <p>&copy; 2026 BikeMarket. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Login Modal */}
            {showLogin && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center"
                    onClick={() => setShowLogin(false)}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

                    {/* Modal */}
                    <div
                        className="relative w-[430px] bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 animate-modalIn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setShowLogin(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Header */}
                        <div className="text-center space-y-2">
                            <div className="text-4xl">🚴</div>
                            <h2 className="text-xl font-semibold">BikeMarket Vietnam</h2>
                            <p className="text-gray-500 text-sm">Nền tảng mua bán xe đạp uy tín</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleLogin} className="mt-6 space-y-4">
                            <div>
                                <label htmlFor="modal-email" className="text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    id="modal-email"
                                    type="email"
                                    placeholder="Nhập email của bạn"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="modal-password" className="text-sm font-medium text-gray-700">
                                    Mật khẩu
                                </label>
                                <input
                                    id="modal-password"
                                    type="password"
                                    placeholder="Nhập mật khẩu"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
                                    required
                                />
                            </div>

                            {loginError && (
                                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-200">
                                    {loginError}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loginLoading}
                                className="w-full bg-black text-white py-2.5 rounded-xl hover:opacity-90 transition font-medium disabled:opacity-50"
                            >
                                {loginLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                            </button>
                        </form>

                        <div className="text-center text-xs text-gray-400 mt-6">
                            © 2026 BikeMarket Vietnam
                        </div>
                    </div>
                </div>
            )}

            {/* Modal animation */}
            <style>{`
                @keyframes modalIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95) translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
                .animate-modalIn {
                    animation: modalIn 0.25s ease-out;
                }
            `}</style>
        </div>
    );
}
